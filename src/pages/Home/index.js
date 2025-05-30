import BarChart from './components/BarChart'

const Home=()=>{

    return (
        <div>
            <BarChart title={'三大框架满意度'} xData={['Vue', 'React', 'Angular']} yData={[10, 40, 70]}/>
            <BarChart title={'三大框架使用度'} xData={['Vue', 'React', 'Angular']} yData={[70, 40, 20]}/>
        </div>
    )
}
export default Home