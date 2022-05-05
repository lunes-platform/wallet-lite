import { useState } from "react";
import Eye from "../assets/images/icons/eye-slash.svg"
import { ITextInput } from "./types";

export default function TextInput(props: ITextInput) {
    const [isPassword, setIsPassword] = useState(props.isPassword)
    return (
        <div className="input-text-holder">
            <label className="input-label">{props.label}</label>
            <input placeholder={props.placeholder} className="input-text" value={props.value} onChange={event => props.onChange(event.target.value)} type={isPassword ? "password" : "text"} />
            {props.isPassword && <button className="password-visibility-switch" onClick={() => setIsPassword(!isPassword)}>
                <img src={Eye} alt="" />
            </button>}
        </div>

    )
}