import style from "./style";
@inject("user")
@observer
export default class test extends Component {
  render() {
    let user = this.props.user;
    return (
      <div className={ style.test }>
        <h1>test</h1>
      </div>
    );
  }
}