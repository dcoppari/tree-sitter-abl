module.exports = ({ kw }) => ({
  put_screen_statement: ($) => seq(kw("PUT"), $.__put_screen_body, $._terminator),

  __put_screen_body: ($) =>
    seq(
      kw("SCREEN"),
      optional(alias($.__put_screen_color_phrase, $.color_phrase)),
      choice(
        // Orden estándar: [ROW] [COL] value
        seq(
          optional(seq(kw("ROW"), field("row", $._expression))),
          optional(seq(choice(kw("COLUMN"), kw("COL")), field("column", $._expression))),
          field("value", $._expression),
        ),
        // Orden legacy: value [COLOR] ROW [COL]  (ROW requerido para desambiguar)
        seq(
          field("value", $._expression),
          optional(alias($.__put_screen_color_phrase, $.color_phrase)),
          seq(kw("ROW"), field("row", $._expression)),
          optional(seq(choice(kw("COLUMN"), kw("COL")), field("column", $._expression))),
        ),
        // Orden legacy: value COL [ROW]  (COL requerido para desambiguar)
        seq(
          field("value", $._expression),
          seq(choice(kw("COLUMN"), kw("COL")), field("column", $._expression)),
          optional(seq(kw("ROW"), field("row", $._expression))),
        ),
      ),
    ),

  __put_screen_color_phrase: ($) => seq(kw("COLOR"), field("color", $._expression)),
});
