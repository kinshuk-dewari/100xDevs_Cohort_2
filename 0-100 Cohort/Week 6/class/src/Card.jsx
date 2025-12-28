function Card(){
    return <div>
        <CardWrapper innerComponent = {<TextComponent/>}/>
    </div>
}

function TextComponent(){
    return <div>
        hi there
    </div>
}
function CardWrapper(){
    return <div style={{border:"2px solid black"}}>
        {innerComponent}
    </div>
}
export default Card