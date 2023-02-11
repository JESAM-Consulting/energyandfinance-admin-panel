import React from "react";
import { useState, useEffect } from "react";
import { ApiDelete, ApiGet } from "../../../helpers/API/ApiData"
import { toast, ToastContainer } from "react-toastify";
import DataTable, { defaultThemes } from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { getUserInfo } from "../../../utils/user.util";
import { Tooltip } from "@material-ui/core"; import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Contact() {

    const [getAllContact, setGetAllContact] = useState<any>({});

    //for pagation
    const [search, setSearch] = useState<any>();
    const [page, setPage] = useState<any>(1);
    const [count, setCount] = useState<any>(0);
    const [countPerPage, setCountPerPage] = useState<any>(10);
    const [show, setShow] = useState<any>(false);
    const [loaderForGetAll, setLoaderForGetAll] = useState<any>(false);
    const [idForAdsData, setIdForAdsData] = useState<any>({});

    const BaseApi_URL = "https://fe-lead-commen-api.rejoicehub.com/FE_API/lead_api/v1/"

    let userInfo = getUserInfo();
    console.log("userInfouserInfo", userInfo);
    const paginationComponentOptions = {
        rowsPerPageText: 'Zeilen pro Seite',
        rangeSeparatorText: 'von',

    }
    //for valied description
    //eslint-disable-next-line
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    //For gell all company
    //eslint-disable-next-line
    useEffect(() => {
        getAllContactData();
    }, [page, countPerPage]);

    const getAllContactData = async () => {
        setLoaderForGetAll(true)
        if (!search) {
           await ApiGet(`get-energy-form?page=${page}&limit=${countPerPage}`)
                .then((res: any) => {
                    console.log("resany", res)
                    setGetAllContact(res?.data?.data);
                    setCount(res?.data?.count);
                    setLoaderForGetAll(false)

                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)

                })
        }
        else {
           await ApiGet(`get-energy-form?search=${search}&page=${page}&limit=${countPerPage}`)
                .then((res: any) => {
                    setGetAllContact(res?.data?.data);
                    setCount(res?.data?.count);
                    setLoaderForGetAll(false)
                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)
                })
        }

    }

    const deleteGreenData = async () => {
        await ApiDelete(`delete-energy-form?energyId=${idForAdsData}`)
            .then((res: any) => {
                if (res?.status === 200) {
                    toast.success("Vielen Dank, Ihre Daten wurden erfolgreich eingereicht.");
                    setShow(false);
                    getAllContactData();

                } else {
                    toast.error("Etwas ist schief gelaufen.Bitte versuche es erneut");
                }
            })
            .catch((err: any) => {
                toast.error("Etwas ist schief gelaufen.Bitte versuche es erneut");
            });

    }

    const handleClose = () => {
        setShow(false);
    };

    //For search and pegination

    const handleSearch = (e: any) => {
        let val = e.target.value.replace(/[^\w\s]/gi, "");
        setSearch(val);
    };
    const debouncedSearchTerm = useDebounce(search, 500);
    function useDebounce(value: any, delay: any) {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                // Update debounced value after delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                // Cancel the timeout if value changes (also on delay change or unmount)
                // This is how we prevent debounced value from updating if value is changed ...
                // .. within the delay period. Timeout gets cleared and restarted.
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay] // Only re-call effect if value or delay changes
        );
        return debouncedValue;
    }
    useEffect(() => {
        if (debouncedSearchTerm) {
            //setIsLoaderVisible(true);
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllContactData();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllContactData();
        }
    }, [debouncedSearchTerm]);

    // -------------------------DATA TABLE--------------------
    const customStyles = {
        header: {
            style: {
                minHeight: "56px",
            },
        },
        headRow: {
            style: {
                borderTopStyle: "solid",
                borderTopWidth: "1px",
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },

        language: {
            oPaginate: {
                sNext: '<i class="fa fa-forward"></i>',
                sPrevious: '<i class="fa fa-backward"></i>',
                sFirst: '<i class="fa fa-step-backward"></i>',
                sLast: '<i class="fa fa-step-forward"></i>'
            }
        },
        cells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },


        pagination: {
            style: {
                minHeight: '40px',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
            },
        },
    };



    const columns = [
        {
            name: "SNo",
            cell: (row: any, index: any) => (page - 1) * countPerPage + (index + 1),
            width: "5%",
        },
        {
            name: "Vorname",
            selector: (row: any) => (row?.firstName ? row?.firstName : "-"),
            sortable: true,
        },
        {
            name: "Nachname",
            selector: (row: any) => (row?.lastName ? row?.lastName : "-"),
            sortable: true,
        },
        {
            name: "E-Mail",
            selector: (row: any) => (row?.email ? row?.email : "-"),
            sortable: true,
        },
        {
            name: "Telefon",
            selector: (row: any) => (row?.phone ? row?.phone : "-"),
            sortable: true,
        },
        {
            name: "postalCode",
            selector: (row: any) => (row?.postalCode ? row?.postalCode : "-"),
            sortable: true,
        },

        {
            name: "Datum",
            selector: (row: any) => moment(row?.createdAt).format("DD/MM/YYYY"),
            width: "10%"
        },

        ...(userInfo?.adminEmail === "admin@jesamconsulting.com" ? [{
            name: "Acktion",
            cell: (row: any) => {
                return (
                    <>
                        <div
                            data-toggle="modal"
                            data-target="#exampleModal"
                            className="cursor-pointer"
                            onClick={(e) => {
                                // deletejobData();
                                setIdForAdsData(row?._id)
                                setShow(true);
                            }}
                        >
                            <Tooltip title="Arbeit löschen" arrow>
                                <DeleteIcon />
                            </Tooltip>
                        </div>

                    </>
                )
            }
        }] : [])


    ];
    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Alarm!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Sind Sie sicher, dass Sie diese Daten löschen möchten?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Nein
                        </Button>
                        <Button
                            variant="success"
                            className="ja-button-background-color"
                            onClick={() => deleteGreenData()}
                        >
                            Ja
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col-lg-6 col-md-12 d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Landing Page</h2>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    onChange={(e) => handleSearch(e)}
                                    placeholder="Suche"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {loaderForGetAll ?
                    <div className="text-center">
                        <div className="spinner-border">
                        </div>
                    </div> :
                    //Data Table

                    <DataTable
                        columns={columns}
                        data={getAllContact}
                        customStyles={customStyles}
                        // pagination
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationComponentOptions={paginationComponentOptions}
                        paginationTotalRows={count}
                        paginationPerPage={countPerPage}
                        paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
                        paginationDefaultPage={page}
                        onChangePage={(page) => {
                            setPage(page);
                        }}
                        onChangeRowsPerPage={(rowPerPage) => {
                            setCountPerPage(rowPerPage);
                        }}
                    />
                }
            </div>

        </>
    );
}
