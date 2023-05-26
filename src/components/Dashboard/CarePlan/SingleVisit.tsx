import { Button, Checkbox, Modal } from "antd";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../states/app.context";

const SingleVisit = ({ code, item, clientPlanChecking }: any) => {
    const { visit, selectedCode, setSelectedCode, clientPlanUpdate, setClientPlanUpdate } = useContext(AppContext);
    const [checkedList, setCheckedList] = useState(selectedCode[item][code.id].visits);
    const [checkAll, setCheckAll] = useState((selectedCode[item][code.id].visits.length === visit) || false);
    const [visible, setVisible] = useState(false);

    const handleVisits = async (e: any, co: any) => { 

        setCheckedList(e);
        const newSelectedCode = {
            ...selectedCode, [item]: { ...selectedCode[item], [co]: { ...selectedCode[item][co], visits: e } }
        }
       await setSelectedCode(newSelectedCode)
        setCheckAll(e.length === visit);
        if (clientPlanChecking == "yes") {
            setClientPlanUpdate(!clientPlanUpdate)

        }
        else {
            console.log("client plan not found");
        }


    };

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
