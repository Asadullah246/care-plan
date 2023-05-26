import { Checkbox, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { queryCode } from '../../../api';
import { AppContext } from '../../../states/app.context';
import SingleVisit from './SingleVisit';

const CodeCategory = ({ item }: any) => {
    const { selectedCode, setSelectedCode } = useContext(AppContext);

    const [visible, setVisible] = useState(false);
    const [codeList, setCodeList] = useState<any[]>([]);
    let catName = item;
    if (item === "Add Ons") {
        catName = "AddOns";
    } else if (item === "X-rays") {
        catName = "XRays";
    }
    const handleCheck = (e: any, code: any) => {
        if (e.target.checked === true) {
            setSelectedCode({
                ...selectedCode, [catName]: { ...selectedCode[catName], [code._id]: { code: code.code, id: code._id, visits: [] } }
            });
        } else {
            delete selectedCode[catName][code._id]
            setSelectedCode({ ...selectedCode, [catName]: { ...selectedCode[catName] } });
        }
    }
    const handleVisits = (e: any, co: any) => {
        setSelectedCode({
            ...selectedCode, [catName]: { ...selectedCode[catName], [co]: { ...selectedCode[catName][co], visits: e } }
        })
    }
    const firstLoad = async () => {
        const response = await queryCode({ category: item });
        if (response.status === 200) {
            setCodeList(response?.data.codeList);
        }
    }

    useEffect(() => {
        firstLoad();
    }, [selectedCode]);
    console.log("se", selectedCode, "codelist",codeList, "visible", visible); 
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}><h4 style={{ marginRight: '5px' }}>{item}</h4> <BsPlusCircle style={{ cursor: 'pointer' }} onClick={() => setVisible(true)} /></div>
            <Modal title={`${item} list`} visible={visible} onOk={() => { setVisible(false) }} onCancel={() => setVisible(false)}>
                {
                    codeList.map((code) => (
                        <div key={code._id} style={{borderBottom: '1px solid skyblue', marginBottom: '5px', padding: '5px'}}><Checkbox onChange={(e) => handleCheck(e, code)} defaultChecked={selectedCode[catName][code.code] || false}>{code.code} {'\u00a0\u00a0\u00a0'} <em><b>{code.description}</b></em></Checkbox></div>
                    ))
                }
            </Modal>
            <div>
            </div>
            {
                Object.values(selectedCode[catName]).map((code: any) => (
                    <SingleVisit key={code._id} code={code} item={catName} handleVisits={handleVisits} />
                ))
            }
        </div >
    );
};

export default CodeCategory;
