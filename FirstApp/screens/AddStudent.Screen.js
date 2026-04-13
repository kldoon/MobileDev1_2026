import AddStudentForm from "../components/AddStudentForm";

const AddStudentScreen = (props) => {
    return (
        <AddStudentForm
            studentData={props.studentData}
            setStudentData={props.setStudentData}
        />
    )
}

export default AddStudentScreen;