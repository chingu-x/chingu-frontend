import React, { Fragment } from "react";
import * as Cards from "../../VoyageCard/VoyageCard";

const NoTeamTypeCards = (pendingApproval, editable) => {
    const NothingHere = () => {
        return (
            <div className="no-data-card">
                Nothing Here Yet! Check Back Later!
        </div>
        )
    }
    let card;
    if (editable && pendingApproval.length > 0) {
        return null;
    } else if (editable) {
        card = <Cards.ApplyForAVoyageCard />
    } else if (!editable && pendingApproval.length === 0) {
        card = <NothingHere />
    }
    return (
        <Fragment>
            <div className="user-voyage-title">Current Voyages</div>
            {card}
        </Fragment>
    )
}

export default NoTeamTypeCards;