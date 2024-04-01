import React from "react";
import s from "@/styles/partials/Button.module.scss";
import {useRouter} from "next/router";
export default function Button({button, path, onClick }) {
    const router = useRouter()
    const handleRouter = () => {
        if(onClick){
            onClick()
        }
        if(path){
            router.push(path);
        }

    }
    return (
        <button onClick={handleRouter} className={s.button}>
            <span>{button}</span>
            <img src="/assets/icons/rightIcon.svg" alt="logo"/>
        </button>
    )
}
