import { Button, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getSalesTax, updateSalesTax } from '../../../api';

const SalesTax = () => {
    const [salesTax, setSalesTax] = useState<number | null>(0);
    const [taxId, setTaxId] = useState('');
    const setSalesTaxValue = async () => {
        const res = await updateSalesTax(taxId, salesTax || 0);
        if (res?.status === 200) {
            message.success("Sales tax updated");
            setSalesTax(res.data.salesTax.salesTax)
        } else {
            message.error("Something went wrong!");
        }
    }
    const gettingData = async () => {
        const taxValue = await getSalesTax();
        setTaxId(taxValue._id);
        setSalesTax(taxValue.salesTax);
    }
    useEffect(() => {
        gettingData();
    }, [])
    return (
        <div>
            <InputNumber onChange={(e) => setSalesTax(e)} name="salesTax" value={salesTax || 0} addonBefore="Sales Tax" />
            <Button type="primary" onClick={setSalesTaxValue}>Set</Button>
        </div>
    );
};

export default SalesTax;