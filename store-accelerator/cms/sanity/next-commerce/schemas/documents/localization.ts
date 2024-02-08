import { defineType } from "sanity";

export default defineType({
    type : "object",
    name: 'localizaton',
    fields:[
        {
          title :"English",
          name: "en",
          type: "string",  
        },
        {
            title:"Arabic",
            name:"ar",
            type :"string"
        }
    ]
})