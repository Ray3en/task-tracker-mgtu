import { useEffect } from "react"
import { useNavigate } from "react-router"


function AboutPage(){
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/tasks')
        }, 2000)
    }, [])
    
    return(
        <section className="content">
            <h1>This is about page!</h1>
        </section>
    )
}

export default AboutPage