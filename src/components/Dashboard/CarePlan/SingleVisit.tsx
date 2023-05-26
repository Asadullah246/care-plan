import { Button, Checkbox, Modal } from "antd";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../states/app.context";

const SingleVisit = ({ code, item, clientPlanChecking }: any) => {
    const { visit, selectedCode, setSelectedCode, setClientPlan, clientPlan, clientPlanUpdate, setClientPlanUpdate } = useContext(AppContext);
    const [checkedList, setCheckedList] = useState(selectedCode[item][code.id].visits);
    const [checkAll, setCheckAll] = useState((selectedCode[item][code.id].visits.length === visit) || false);
    const [visible, setVisible] = useState(false);

    // console.log("first code checking", selectedCode);
    // navigator.clipboard.writeText(JSON.stringify(clientPlan))

    // useEffect(() => {
    //     if (clientPlanChecking == "yes") {
    //         planUpdate()
    //         console.log("%plan updated","color: blue; font-weight: bold;");
    //     }
    // }, [selectedCode])

    // const planUpdate = () => {
    // setClientPlan({ ...clientPlan, carePlan: { ...clientPlan.carePlan, ...selectedCode } })
    // setClientPlan({ ...clientPlan, carePlan: selectedCode })

    // setClientPlan((prevClientPlan:any) => {
    //     // Retrieve the existing carePlan object
    //     const existingCarePlan = prevClientPlan.carePlan;
    //     console.log("exist", existingCarePlan);

    //     // Update the necessary fields within the carePlan object using selectedCode
    //     const updatedCarePlan = {
    //         ...existingCarePlan,
    //         Adjustments: {
    //             ...existingCarePlan.Adjustments,
    //             ...selectedCode.Adjustments
    //         },
    //         Exams: {
    //             ...existingCarePlan.Exams,
    //             ...selectedCode.Exams
    //         },
    //         XRays: {
    //             ...existingCarePlan.XRays,
    //             ...selectedCode.XRays
    //         }
    //         // Update other properties as needed
    //     };

    //     // Update the carePlan object within the clientPlan state
    //     return {
    //         ...prevClientPlan,
    //         carePlan: updatedCarePlan
    //     };
    // });
    // }

    const handleVisits = async (e: any, co: any) => {

        setCheckedList(e);
        const newSelectedCode = {
            ...selectedCode, [item]: { ...selectedCode[item], [co]: { ...selectedCode[item][co], visits: e } }
        }
       await setSelectedCode(newSelectedCode)
        console.log("new code code",newSelectedCode);
        setCheckAll(e.length === visit);
        if (clientPlanChecking == "yes") {
            console.log("updating");
            setClientPlanUpdate(!clientPlanUpdate) 
                // setClientPlan({ ...clientPlan, carePlan: { ...clientPlan.carePlan, ...selectedCode } })
            // console.log(" ++ testing", { ...clientPlan, carePlan: selectedCode });

        }
        else {
            console.log("client plan not founddddddddddddddddddd");
        }


    };
    console.log("new ", selectedCode);
      console.log("new clientP", clientPlan);


    const onCheckAllChange = (e: any) => {
        if (e.target.checked) {
            setCheckedList(Array.from({ length: visit }, (_, i) => i + 1));
            setSelectedCode({ ...selectedCode, [item]: { ...selectedCode[item], [code.id]: { ...selectedCode[item][code.id], visits: Array.from({ length: visit }, (_, i) => i + 1) } } })
        } else {
            setCheckedList([]);
            setSelectedCode({ ...selectedCode, [item]: { ...selectedCode[item], [code.id]: { ...selectedCode[item][code.id], visits: [] } } })
        }
        setCheckAll(e.target.checked);
    };

    return (
        <>
            <div style={{ margin: '5px 0' }} key={code.id}>{code.code}
                <Button style={{ marginLeft: '5px' }} onClick={() => setVisible(true)}>{selectedCode[item][code.id].visits.length || 0}</Button>
            </div>
            <Modal title={`select visit for ${code.code}`} visible={visible} onOk={() => { setVisible(false) }} onCancel={() => setVisible(false)}>
                <Checkbox style={{ marginBottom: "1rem" }} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox><br />
                <Checkbox.Group value={checkedList} onChange={(e) => handleVisits(e, code.id)} options={Array.from({ length: visit }, (_, i) => i + 1)} />
            </Modal>
        </>
    );
};

export default SingleVisit;
