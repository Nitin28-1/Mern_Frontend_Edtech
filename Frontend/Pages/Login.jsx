import loginImg from "../assets/Images/login.jpg"
import Template from "../Components/Core/Auth/Template"

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
   
  )
}

export default Login