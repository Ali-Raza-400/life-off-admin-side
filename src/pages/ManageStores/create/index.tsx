import { Form } from "antd";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { useSaveStoreMutation } from "../../../redux/slices/store"
import AddStore from "./AddStore"
import useNotification from "../../../components/UI/Notification";
import { getErrorMessage } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../../navigation/Path";


const Index = () => {
    const [saveStore] = useSaveStoreMutation()
    const { showAlert } = useGenericAlert();
    const { openNotification, contextHolder } = useNotification()
    const [form] = Form.useForm();
    const navigate=useNavigate()

    const handleAddStore = async (userData: any) => {
        const payload = {
            ...userData,
        }
        console.log("payload:::",payload)
        try {
            debugger
            await saveStore(payload).unwrap();
            showAlert({
                type: "success",
                title: "Store Added!",
                message: "The store has been added successfully.",
                confirmButtonText: "OK",
                onConfirm: () => { },
            });
            navigate(PATH.STORES)
            form.resetFields();
        } catch (error: unknown) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            });
        }
    }
    return (
        <>{contextHolder}
            <AddStore onAddStore={handleAddStore} />
        </>
    )
}

export default Index