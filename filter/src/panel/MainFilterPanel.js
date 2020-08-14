/* eslint-disable react/destructuring-assignment */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconLeftAlign } from "../images/icon-leftAlign.svg";
import SavedFilters from "./SavedFilters";

let chips;
let chipCount;
const MainFilterPanel = (props) => {
    const [listFilter, setListFilter] = useState(false);
    const [chipArray, setChipArray] = useState([]);
    const [countShow, setCountShow] = useState("none");
    useEffect(() => {
        setChipArray(props.applyFilterChip.applyFilter);
        if (
            props.applyFilterChip.applyFilter &&
            props.applyFilterChip.applyFilter.length > 0
        ) {
            setCountShow("");
        } else {
            setCountShow("none");
        }
    }, [props.applyFilterChip]);
    const handleListFilter = () => {
        setListFilter(!listFilter);
    };
    if (chipArray) {
        chipCount = chipArray.length;
        chips = chipArray.map((item, index) => {
            if (item.type) {
                return (
                    <div
                        role="presentation"
                        className="listContent"
                        key={index}
                        onClick={() => {
                            props.addAppliedFilters(chipArray);
                        }}
                    >
                        <span>
                            {item.name}:{item.type}
                        </span>
                        {item.value.map((value, index_) => {
                            return <div key={index_}>{value.value}</div>;
                        })}
                    </div>
                );
            }
            if (item.condition) {
                return (
                    <div
                        role="presentation"
                        className="listContent"
                        key={index}
                        onClick={() => {
                            props.addAppliedFilters(chipArray);
                        }}
                    >
                        <span>{item.name}</span>:{item.condition}
                        {item.amount}
                    </div>
                );
            }
            if (item.fieldValue) {
                return (
                    <div
                        role="presentation"
                        className="listContent"
                        key={index}
                        onClick={() => {
                            props.addAppliedFilters(chipArray);
                        }}
                    >
                        <span>{item.fieldValue}</span>
                        {item.value}
                    </div>
                );
            }
            return (
                <div
                    role="presentation"
                    className="listContent"
                    key={index}
                    onClick={() => {
                        props.addAppliedFilters(chipArray);
                    }}
                >
                    <span>{item.name}</span>:{item.value}
                </div>
            );
        });
    } else {
        chips = <div />;
    }

    return (
        <div className="neo-header">
            <div className="displayFlex">
                <div className="alignLeft">
                    <div
                        role="presentation"
                        className="iconLeft"
                        onClick={handleListFilter}
                    >
                        <IconLeftAlign />
                    </div>
                    <SavedFilters
                        onSelectSavedFilter={props.onSelectSavedFilter}
                        showFilter={listFilter}
                        handleListFilter={handleListFilter}
                        addSavedFilters={props.addSavedFilters}
                        addingToFavourite={props.addingToFavourite}
                    />
                    <div className="leftSpace">All flights</div>
                </div>
            </div>
            <div className="secondList">
                <div className="displayFlex">
                    <span
                        style={{ display: countShow }}
                        className="listContent"
                    >
                        count:{chipCount}
                    </span>
                    {chips}
                    <div
                        role="presentation"
                        onClick={() => {
                            props.showDrawer();
                        }}
                        className="addFilter"
                    >
                        + Add Filter
                    </div>
                </div>
            </div>
        </div>
    );
};

MainFilterPanel.propTypes = {
    applyFilterChip: PropTypes.any,
    addAppliedFilters: PropTypes.any,
    onSelectSavedFilter: PropTypes.any,
    addSavedFilters: PropTypes.any,
    addingToFavourite: PropTypes.any,
    showDrawer: PropTypes.any
};

export default MainFilterPanel;
