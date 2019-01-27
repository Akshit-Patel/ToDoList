var Headings = [];
var Details= ["j"];
var WhenToDo = ["j"];
class Input extends React.Component{
    constructor(props){
        super(props);
        this.changeHandle =  this.changeHandle.bind(this);
        
    }
changeHandle(e){
    this.props.changeHandler(e.target.value);
}
 render(){
     let infoType = this.props.infoType;
     let userInput = this.props.userInput;
     if(infoType == "Name"){
        Headings[this.props.number] = userInput;
       }
       if(infoType == "Details"){
       Details[this.props.number] = userInput;
       }
       if(infoType == "WhenToDo"){
       WhenToDo[this.props.number] = userInput;
       }
     return(
     <React.Fragment>
     <label>{infoType}</label>
     <input value={userInput} onChange={this.changeHandle}></input>
     </React.Fragment>
     )
}
}

class PopUpDiv extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        var a= this.props.children;
        return(
            <div>
               {a}
            </div>
        )
    }
}
class PopupForAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // Name: "",
            // Details: "",
            // WhenToDo:""
            Name:"",
            Details:"",
            WhenToDo:"",
            value:""
        }
        this.Name = "Name";
        this.Details = "Details";
        this.WhenToDo = "WhenToDo";
        this.inputHandler1 = this.inputHandler1.bind(this);
        this.inputHandler2 = this.inputHandler2.bind(this);
        this.inputHandler3 = this.inputHandler3.bind(this);
    } 
    inputHandler1(userInput){
        this.setState({Name:userInput});   
    }
    
    inputHandler2(userInput){
        this.setState({Details:userInput});   
    }
    
    inputHandler3(userInput){
        this.setState({WhenToDo:userInput});   
    }
    render(){
        let input1 = this.state.Name;
        let input2 = this.state.Details;
        let input3 = this.state.WhenToDo;
        return(
              <PopUpDiv>
              <Input infoType={this.Name} userInput={input1} changeHandler ={this.inputHandler1} number={this.props.arrayPos}/>
              <Input infoType={this.Details} userInput={input2} changeHandler ={this.inputHandler2} number={this.props.arrayPos}/>
              <Input infoType={this.WhenToDo} userInput={input3} changeHandler ={this.inputHandler3} number={this.props.arrayPos}/>
              </PopUpDiv>
    ) }
}
class Button extends React.Component{
   constructor(props){
   super(props);
   this.clicking = this.clicking.bind(this);
   }
   clicking(e){
       this.props.click(e.target.value);
   }
    render(){
        return(
            <button onClick={this.clicking}>{this.props.text}</button>
            );
    }
   
}
class ContainerGen extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
          <div className="container">
          {this.props.children}
          </div>
        )
    }
}
class ShowButton extends React.Component{
constructor(props){
   super(props); 
   this.state = {
       isClicked:false,
       count:-1
   }
   this.onClick = this.onClick.bind(this);
   this.button = <Button click={this.onClick} text="Add Item"/>;
   this.onClickAdd = this.onClickAdd.bind(this);
   this.onClickCancel = this.onClickCancel.bind(this);
}
onClick(){
if(this.state.isClicked == false){
this.setState(state => ({isClicked : !state.isClicked,count : ++state.count}));
}
}

onClickAdd(){
    if(this.state.isClicked == true){
        this.setState(state => ({isClicked : !state.isClicked}));
    }
}
onClickCancel(){
    if(this.state.isClicked == true){
        this.setState(state => ({isClicked : !state.isClicked,count : --state.count}));
    }
    Headings[this.state.count] = null;
    WhenToDo[this.state.count] = null;
    Details[this.state.count] = null;
}

render(){
  let addInfo;
  let addButton;
  let cancelButton;
  let container;
 if(this.state.isClicked){
     addInfo = <PopupForAdd arrayPos={this.state.count}/>
     addButton = <Button click={this.onClickAdd} text="OK!"/>;
     cancelButton = <Button click={this.onClickCancel} text="Cancel"/>;
     container = <ContainerGen>
        {addInfo}
        {addButton}
        {cancelButton}
     </ContainerGen>
 }
 else{
     container = null;
 }  
 return(
    <React.Fragment>
    <span className="AddButton">{this.button}</span>
    {container}
    <div className="list">
    <ShowData/>
    </div>  
     </React.Fragment>
 )
}
}

// class ShowMoreInfo extends React.component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isClicked: true
//         };
// } 

// }
class ShowData extends React.Component{
    constructor(props){
        super(props);
}
render(){
//let l = Headings.map((items,index) =>  (items !== "")?(<li key={index}>{items}</li>):({}));
 let finalArray_Headings  = Headings.filter((items) => (items !== "" && items !== null));
 let finalArray_Details  = Details.filter((items) => (items !== "" && items !== null));
 let finalArray_WhenToDo = WhenToDo.filter((items) => (items !== "" && items !== null));
 let itemList = finalArray_Headings.map((items,index) => (

 <ol>
 <li key={index}>
    <div>{items}</div>
    <ul>
      <li><div>Details- {finalArray_Details[index]}</div></li>
      <li><div>Date- {finalArray_WhenToDo[index]}</div></li>
    </ul>
 </li>
 </ol>)
 );   
return(
        <div>{itemList}</div>
    )
    
}
}

ReactDOM.render(
<ShowButton/>, document.getElementById("root")
)
