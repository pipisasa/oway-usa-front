import React from "react";

import Contacts from "../../components/partials/Contacts";
import Faq from "../../components/partials/Faq";
import Feedback from "../../components/shared/Feedback";

export default function FaqPage() {
    return (
        <div>
            <div style={{width:"100%", height:"720px", borderRadius:"0px 0px 64px 64px",background: "var(--bue_light_2, #F7F9FC)"}}>
                <Faq margin='no'/>
            </div>
            <Feedback/>

            <Contacts/>
        </div>
    );
}