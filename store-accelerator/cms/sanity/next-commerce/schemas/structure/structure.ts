import { type ListBuilder, type StructureBuilder } from "sanity/structure";

export default (S: StructureBuilder): ListBuilder =>
  S.list()
    .title("storeAcelarator")
    .items([
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.listItem()
                .title("custom page")
                .child(
                  S.documentTypeList("nav")
                ),
              S.listItem()
                .title("pre-defined pages")
                .child(
                  S.list()
                    .title("Sections")
                    .items([
                      S.listItem()
                        .title("PLP")
                        .child(
                          S.documentTypeList("ProductCard")
                            .title('items')
                        ),
                        S.listItem()
                        .title("Cart")
                        .child(
                          S.documentTypeList("cartItems")
                            .title('items')
                        ),
                    ]),
                ),
            ]),
        )
    ]);
