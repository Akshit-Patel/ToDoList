var Headings = [];
var Details= [];
var WhenToDo = [];
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
     <label>{infoType} </label>
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
        console.log(this.props.number);
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
              <Input infoType={this.Name} userInput={input1} changeHandler ={this.inputHandler1}/>
              <Input infoType={this.Details} userInput={input2} changeHandler ={this.inputHandler2}/>
              <Input infoType={this.WhenToDo} userInput={input3} changeHandler ={this.inputHandler3}/>
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
            <button onClick={this.clicking}>Add New Item</button>
            );
    }
   
}
class ShowButton extends React.Component{
constructor(props){
   super(props); 
   this.state = {
       isClicked:false
   }
   this.onClick = this.onClick.bind(this);
   this.button = <Button click={this.onClick}/>;
}
onClick(){
this.setState(state => ({isClicked : !state.isClicked}));
}
render(){
 
  let addInfo;
 if(this.state.isClicked){
     addInfo = <PopupForAdd number={0}/>
 }
 else{
     addInfo= null;
 }  
 return(
     
    <React.Fragment>
    {this.button}
    <div className="container">{addInfo}</div>
    </React.Fragment>
 )
}
}

ReactDOM.render(
    <ShowButton/>, document.getElementById("AddItemButton")
)

