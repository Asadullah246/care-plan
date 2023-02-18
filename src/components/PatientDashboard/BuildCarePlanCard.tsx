import { Card } from 'antd';
import SingleCodeDetails from './SingleCodeDetails';

const BuildCarePlanCard = ({ data, title }: any) => {
    if (data === undefined || Object.keys(data).length === 0) {
        return <p></p>
    }
    return (
        <Card style={{ minWidth: 200, margin: '1rem' }}>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>{title}</td>
                        <td>Qty:</td>
                        <td>Cost</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(data).map((code: any) => (
                            <SingleCodeDetails key={code._id} data={code} title={title} />
                        ))
                    }
                </tbody>
            </table>
        </Card>
    );
};

export default BuildCarePlanCard;