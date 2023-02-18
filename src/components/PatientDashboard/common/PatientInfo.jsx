import { Button, DatePicker, Form, Input, message } from 'antd';
import moment from 'moment';
import { useContext } from 'react';
import { updatePatient } from '../../../api';
import { AppContext } from '../../../states/app.context';

const PatientInfo = () => {
    const { patient } = useContext(AppContext);
    const onSubmit = async (value) => {
        const val = {
            ...value,
            dob: value.dob?._d.toString().slice(0, 15)
        }
        const res = await updatePatient(patient?._id, val);
        if (res?.status === 200) {
            message.success('Patient info updated');
        } else {
            message.error('Patient info updated: something went wrong');
        }
    }
    return (
        <div style={{ borderBottom: "2px solid black" }}>
            <h1>Patient Info:</h1>
            <Form
                name='patient-info'
                onFinish={onSubmit}
                style={{ display: 'flex', gap: '5px' }}
            >
                <Form.Item
                    label="Patient first Name:"
                    name="firstName"
                    style={{ width: '30%' }}
                >
                    {patient ? (<Input placeholder={patient?.firstName} />) : 'Loading...'}
                </Form.Item>
                <Form.Item
                    label="Patient last Name:"
                    name="lastName"
                    style={{ width: '30%' }}
                >
                    {patient ? (<Input placeholder={patient?.lastName} />) : 'Loading...'}
                </Form.Item>
                <Form.Item
                    label="DOB:"
                    name="dob"
                    style={{ width: '30%' }}
                >
                    {patient ? (<DatePicker
                        name="dob"
                        defaultValue={moment(`${patient?.dob.slice(5, 7)}/${patient?.dob.slice(8, 10)}/${patient?.dob.slice(0, 4)}`, "MM/DD/YYYY")}
                        format={"MM-DD-YYYY"}
                    />) : 'Loading...'}
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PatientInfo;