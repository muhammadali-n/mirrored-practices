import { defineField, defineType } from "sanity";

const languages: Array<{ title: string, code: string, default: boolean }> = [
    { title: "English", code: "en", default: true },
    { title: "Arabic", code: "ar", default: false }
  ];


  const localeString = defineType({
    title: "Localized String",
    type: "object",
    name: "localeString",
    options: { collapsible: true, collapsed: true },
    fields: languages.map(lang => (
      defineField({
        name: lang.code,
        title: lang.title,
        type: "string",
      })
    ))
  });
  export default localeString