module.exports = ({ kw }) => ({
  entered_expression: ($) =>
    choice(
      prec.right(-2, seq(field("field", $._identifier_or_qualified_name), kw("ENTERED"))),
      prec.right(-2, seq(kw("ENTERED"), field("field", $._identifier_or_qualified_name))),
    ),

  not_entered_expression: ($) =>
    choice(
      prec.right(-2, seq(field("field", $._identifier_or_qualified_name), kw("NOT"), kw("ENTERED"))),
      prec.right(-2, seq(kw("NOT"), kw("ENTERED"), field("field", $._identifier_or_qualified_name))),
    ),
});
