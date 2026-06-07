module.exports = ({ kw }) => ({
  view_statement: ($) => seq(kw("VIEW"), optional($.__view_tail), $._terminator),
  __view_tail: ($) =>
    choice(seq($._stream_phrase, optional($.__view_window_tail)), $.__view_window_tail),
  __view_window_tail: ($) =>
    choice(
      seq(
        $.widget_phrase,
        optional(seq(kw("IN"), kw("FRAME", { offset: 3 }), field("frame", $.identifier))),
        optional($.in_window_phrase),
      ),
      $.in_window_phrase,
    ),
});
