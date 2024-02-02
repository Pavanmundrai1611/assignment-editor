import 'draft-js/dist/Draft.css';
import TextEditor from './TextEditor';

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}><span style={{ fontWeight: '200', color: 'red' }}>EDITOR </span>
        <span style={{ fontWeight: '200', textDecoration: 'underline' }}>USING</span>
        <span > DRAFT-JS</span></h1>
      <TextEditor />
      <div style={{textAlign:'center'}}>
        <h3>Made by: Pavan Kumar Mundrai</h3>
        <h3>portfolio: <a href="https://pavan-s-portfolio-c5bf5.web.app/" target='_blank'>click here</a></h3>
        <h3>mail: <a href="mailto:mundrai.pavan@gmail.com">pavanmundrai@gmail.com</a></h3>
      </div>
    </>
  );
}

export default App;
