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
 if(this.state.isClicked){
     addInfo = <div className="container"><PopupForAdd arrayPos={this.state.count}/></div>
     addButton = <Button click={this.onClickAdd} text="OK!"/>;
     cancelButton = <Button click={this.onClickCancel} text="Cancel"/>;
 }
 else{
     addInfo= null;
     addButton = null;
     cancelButton = null;
 }  
 return(
    <React.Fragment>
    {this.button}
    {addInfo}
    {addButton}
    {cancelButton}
    <ShowData/>
    </React.Fragment>
 )
}
}
class ShowData extends React.Component{
    constructor(props){
        super(props);
}
render(){
//let l = Headings.map((items,index) =>  (items !== "")?(<li key={index}>{items}</li>):({}));
 let finalArray  = Headings.filter((items) => (items !== "" && items !== null));
 let itemList = finalArray.map((items,index) => (<li key={index}>{items}</li>));   
return(
        <ul>{itemList}</ul>
    )
       
    
}
}
ReactDOM.render(
<ShowButton/>, document.getElementById("AddItemButton")
)
