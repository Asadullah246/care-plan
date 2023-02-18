import { Col, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { getExamList } from "../../api";
import { AppContext } from "../../states/app.context";
import { IExams } from "../../types";

export const ExamsCard = () => {
  const { selectedExam, setSelectedExam } = useContext(AppContext);
  const [exams, setExams] = useState<IExams[]>([]);
  const [total, setTotal] = useState(0);
  const isChecked = (code: number | string): boolean => {
    return !!selectedExam[code];
  };
  const getTotal = () => {
    const sums = Object.values(selectedExam).map((item: any) => {
      return item.item.cost * item.qty;
    });
    setTotal(sums.reduce((sum: number, cost: number) => sum + cost, 0));
  };

  const handleCheck = (e: any, item: IExams) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedExam({ ...selectedExam, [value]: { item, qty: 1 } });
    } else {
      const newSelection = { ...selectedExam };
      delete newSelection[value];
      setSelectedExam(newSelection);
    }
  };

  const handleQty = (e: any, code: number | string) => {
    if (selectedExam[code]) {
      const update = { ...selectedExam[code], qty: e.target.valueAsNumber };
      setSelectedExam({ ...selectedExam, [code]: update });
    }
  };

  const gettingExamList = async () => {
    const examList = await getExamList();
    if (examList) setExams(examList);
  };

  useEffect(() => {
    getTotal();
    gettingExamList();
  }, [selectedExam]);
  return (
    <div className="builder_item">
      <div className="builder_card">
        <p>Exams</p>
        <p>Qty</p>
        <p>Cost</p>
      </div>
      {exams.map((exam) => (
        <div className="builder_card" key={exam.code}>
          <span className="flex">
            <input
              type="checkbox"
              value={exam.code}
              onClick={(e) => handleCheck(e, exam)}
              checked={isChecked(exam.code)}
              key={exam.code}
            />
            {exam.code}
          </span>
          <span>
            {" "}
            <Input
              size="small"
              disabled={!isChecked(exam.code)}
              type="number"
              onChange={(e) => handleQty(e, exam.code)}
              min={1}
              value={selectedExam[exam.code]?.qty || 0}
            />{" "}
          </span>
          <span>$ {exam.cost}</span>
        </div>
      ))}
      <Row justify="space-around">
        <Col>
          Total <br />${total}
        </Col>
        <Col>
          1x Payment <br />${total}
        </Col>
        <Col>
          Monthly <br />${total / 4}
        </Col>
      </Row>
    </div>
  );
};
