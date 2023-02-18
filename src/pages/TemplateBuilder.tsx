import { Button, Modal, Skeleton, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import TemplateEditor from "../components/Common/TemplateEditor";
import { NoPermission } from "../components/Dashboard/NoPermission/NoPermission";
import { columnsData, placeholders } from "../components/Dashboard/TemplateBuilder/PlaceholderData";
import TemplateDetails from "../components/Dashboard/TemplateBuilder/TemplateDetails";
import { AppContext } from "../states/app.context";

const TemplateBuilder = () => {
  const { templateList, gettingTemplateBuilderList, user } = useContext(AppContext);
  const [edit, setEdit] = useState();
  const [mode, setMode] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    gettingTemplateBuilderList();
  }, []);

  return (
    <>
      {
        user.role === "administrator" ? <div>
          <h1>Template Builder {templateList.length}</h1>
          <table>
            <thead>
              <tr>
                <td></td>
                <td></td>
                <th>Template Name</th>
              </tr>
            </thead>
            <tbody>
              {templateList.length !== 0 ? (
                templateList?.map((item: any) => (
                  <TemplateDetails
                    data={item}
                    key={item._id}
                    edit={setEdit}
                    setMode={setMode}
                  />
                ))
              ) : (
                <Skeleton active />
              )}
            </tbody>
          </table>
          <Button onClick={() => setModal(true)}>Placeholder list</Button>
          <Modal title="Template Placeholder variables" visible={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
            <Table columns={columnsData} dataSource={placeholders} pagination={false} />
          </Modal>
          <TemplateEditor data={edit} mode={mode} />
        </div> : <NoPermission />
      }
    </>
  );
};

export default TemplateBuilder;
