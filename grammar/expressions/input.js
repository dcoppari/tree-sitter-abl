module.exports = ({ kw }) => ({
  input_expression: ($) => seq(kw("INPUT"), $.__input_expression_body),

  __input_expression_body: ($) =>
    seq(
      optional(
        choice(
          seq(kw("FRAME", { offset: 3 }), field("frame", $.identifier)),
          seq(kw("BROWSE"), field("browse", $.identifier)),
        ),
      ),
      field("field", choice($._identifier_or_qualified_name, $.object_access, $.array_access)),
    ),
});
