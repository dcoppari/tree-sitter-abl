module.exports = ({ kw }) => ({
  declare_cursor_statement: ($) =>
    seq(
      kw("DECLARE"),
      field("cursor", $.identifier),
      kw("CURSOR"),
      kw("FOR"),
      $.__sql_cursor_select,
      $._terminator,
    ),

  // SQL: SELECT col-list FROM table [WHERE condition]
  // "select" resolves to $.identifier via keyword extraction
  __sql_cursor_select: ($) =>
    seq(
      $.identifier,                    // SELECT keyword (parsed as identifier)
      repeat($.__sql_col_item),        // column list: expressions and commas
      kw("FROM"),
      field("from_table", $._identifier_or_qualified_name),
      optional(seq(kw("WHERE"), field("where", $._expression))),
    ),

  __sql_col_item: ($) => choice($._expression, ","),

  fetch_cursor_statement: ($) =>
    seq(
      kw("FETCH"),
      field("cursor", $.identifier),
      kw("INTO"),
      field("variable", $._identifier_or_qualified_name),
      repeat(seq(",", field("variable", $._identifier_or_qualified_name))),
      $._terminator,
    ),

  open_cursor_statement: ($) =>
    seq(
      kw("OPEN"),
      field("cursor", $.identifier),
      $._terminator,
    ),

  close_cursor_statement: ($) =>
    seq(
      kw("CLOSE"),
      field("cursor", $.identifier),
      $._terminator,
    ),
});
