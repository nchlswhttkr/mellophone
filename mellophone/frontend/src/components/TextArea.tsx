import React from "react";
import classnames from "classnames";

import classes from "./TextArea.module.css";

interface Props {
  rows: number;
  label: string;
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  value?: string;
  className?: string;
  "aria-label"?: string;
}

/**
 * Used for obtaining multiline user input, similar to <Input/>
 */
function TextArea(props: Props, ref?: React.Ref<HTMLTextAreaElement>) {
  return (
    <label className={classnames(classes.label, props.className)}>
      {props.label}
      <textarea
        rows={props.rows}
        className={classes.textarea}
        ref={ref}
        onInput={props.onInput}
        value={props.value}
        aria-label={props["aria-label"]}
      />
    </label>
  );
}

export default React.forwardRef(TextArea);
