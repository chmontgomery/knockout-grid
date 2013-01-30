// ****************************************************************************
// Copyright 2013-2013 VMware, Inc. All rights reserved. -- VMware Confidential
// ****************************************************************************

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using VMware.Go;
using VMware.Go.ActiveManagement.Views;
using VMware.Go.CodeGeneration;

namespace vLaunchPro.Web.Bundles.TypeScript.Go
{
    using System.Reflection;

    using VMware.Go.Data;

    using iSynaptic.Commons;

    public sealed class GoDomain : InPlaceTypeScriptCodeGenerator
	{
		[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity", Justification = "Code Generator, can refactor in future")]
		protected override bool Generate()
		{
            var subjects = VMware.Go.Description.Domain.Describe().Modules
                .SelectMany(x => x.Subjects)
                .ToArray();

            Reference(new []
                {
                    "Subjects/SubjectRef.d.ts",
                    "Subjects/SubjectViewModel.ts",
                    "../_Definitions/Scripts/Shared/CommonTypes.d.ts"
                }).NewLine();

			Raw("module go.Subjects ");
			Block(() =>
			{
				foreach (var subject in subjects)
				{
				    var dtoPropertyNames = typeof(VirtualMachineDto).Assembly.GetExportedTypes()
				                                           .SingleOrDefault(x => x.Name == subject.Name + "Dto")
				                                           .ToMaybe()
				                                           .Select(x => x.GetProperties())
				                                           .ValueOrDefault(new PropertyInfo[]{}) //Maybe was weird here
                                                           .Select(x => x.Name);

					
                    Fmt("export class {0}ViewModel extends SubjectViewModel", subject.Name).Block(() =>
					{
						Raw("constructor(subjectRef: Subjects.SubjectRef, properties?: any)").Block(() =>
						{
							Raw("super(subjectRef);").NewLine();
							Raw("this.applyProperties(properties);").NewLine();
						}).NewLine();
						NewLine();

							foreach (string name in dtoPropertyNames.Except(new[] { "SubjectRef", "RootRef" }))
							{
								Fmt("public {0} = ko.observable();", CamelCase(name)).NewLine();
							}
					}).NewLine();

					Fmt("export class {0}Properties", subject.Name).Block(() =>
					{
							foreach (string name in dtoPropertyNames.Except(new[] { "SubjectRef", "RootRef" }))
							{
								Fmt("public static {0}() {{ return \"{1}\"; }}", CamelCase(name), name).NewLine();
							}
					}).NewLine();
				}

				Raw("export interface ViewModelFactoryMethod").Block(() =>
				                                                     Raw("(subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) : SubjectViewModel;").NewLine()
					).NewLine();

				Raw("export class ViewModelFactory").Block(() =>
				{
					Raw("static constructors: { [typeName: string]: ViewModelFactoryMethod; } = ").Block(() =>
					{
						foreach (var subject in subjects)
						{
							Fmt("\"{0}\" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new {1}ViewModel(subjectRef, properties),",
							    subject.Abbreviation, subject.Name).NewLine();
						}
					}).NewLine();

					Raw(@"public static create(subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap)").Block(() =>
					{
						Raw(@"var factory = ViewModelFactory.constructors[subjectRef[""$subjectRefType""]];").NewLine();
						Raw(@"return factory").NewLine();
						Indented(() =>
						{
							Raw(@"? factory(subjectRef, properties)").NewLine();
							Raw(@": new SubjectViewModel(subjectRef, properties);").NewLine();
						});
					}).NewLine();

					foreach (var subject in subjects)
					{
						Fmt("public static set{0}Factory(method: ViewModelFactoryMethod)", subject.Name)
                            .Block(() => Fmt(@"ViewModelFactory.constructors[""{0}""] = method;", subject.Abbreviation).NewLine()
							).NewLine();
					}
				}).NewLine();
			}).NewLine();

            NewLine();
            NewLine();

            GenerateMessageTypes();

		    return true;
		}

        private void GenerateMessageTypes()
        {
            var messageTypes = new []
	        {
		        typeof(SubjectChangedEvent),
		        typeof(PropertyDelta),
		        typeof(SubjectsChangedEvent),
		        typeof(AssociatedView),
		        typeof(ViewMemberStatus),
		        typeof(PropertyDeltaReason),
		        typeof(SubjectDeltaReason),
		        typeof(ViewRequest)
	        };


            Raw("module go.ActiveManagement.Messages").Block(() =>
                {
                    foreach (var type in messageTypes)
                    {
                        string name = GetClientType(type, messageTypes);

                        if (type.IsEnum)
                        {
                            Fmt("export class {0}", type.Name).Block(() =>
                                {
                                    foreach (var p in type.GetEnumNames())
                                    {
                                        Fmt("public static {0}()", p).Block(() =>
                                            {
                                                Fmt(@"return ""{0}"";", p).NewLine();
                                            }).NewLine();
                                    }
                                }).NewLine();
                        }
                        else
                        {
                            Fmt("export interface {0}", name).Block(() =>
                                {
                                    foreach (var p in type.GetProperties())
                                    {
                                        var clientType = GetClientType(p.PropertyType, messageTypes);
                                        Fmt("{0} : {1};", CamelCase(p.Name), clientType).NewLine();
                                    }
                                }).NewLine().NewLine();
                        }
                    }
                }).NewLine();
        }

		private static string CamelCase(string name)
		{
			char first = name[0];
			if (char.IsUpper(first))
			{
				return char.ToLower(first, CultureInfo.InvariantCulture) + name.Substring(1);
			}
			return name;
		}

        private static string GetClientType(Type type, IEnumerable<Type> exportedTypes)
        {
            if (typeof(SubjectRef).IsAssignableFrom(type))
                return "Subjects.SubjectRef";
            if (typeof(string) == type)
                return "string";
            if (typeof(bool) == type)
                return "bool";
            if (type.IsEnum)
                return "string";
            if (type.Name == "IEnumerable`1")
                return GetClientType(type.GetGenericArguments()[0], exportedTypes) + "[]";
            if (exportedTypes.Contains(type))
            {
                if (type.IsInterface)
                    return type.Name;
                if (type.IsClass)
                    return type.Name;
            }

            return "any";
        }
	}
}