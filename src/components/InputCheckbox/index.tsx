import classNames from "classnames";
import { useRef } from "react";
import { InputCheckboxComponent } from "./types";

export const InputCheckbox: InputCheckboxComponent = ({
  id,
  checked = false,
  disabled,
  onChange,
}) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`);

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        /* bug-2 fix: <label> element was not associated with <input> element. 
        Added the `htmlFor` attribute to indicate that the <label> element 
        is bound to the <input> element. */
        htmlFor={inputId}
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
    </div>
  );
};
