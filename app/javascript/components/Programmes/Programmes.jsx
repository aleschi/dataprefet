import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import Dropzone from 'react-dropzone';
import Moment from 'moment';

class Programmes extends React.Component {
        constructor() {
          super();
          this.onDrop = (files) => {
            this.setState({files})
          };
          this.state = {
            files: [],
            loading: false,
            programmes: [],
            statut: '',
          };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
    const url = "/api/v1/programmes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ programmes: response.programmes }))
      .catch(error => console.log(error.message));

      const url2 = "/check_user_status";
      fetch(url2)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ statut: response.statut }))
        .catch(() => console.log(error.message));
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });

        const url = "/api/v1/programmes/import";
        const formData = new FormData();

        formData.append('file', this.state.files[0]);

        const token = document.querySelector('meta[name="csrf-token"]').content;
      
        fetch(url, {
          method: "POST",
          
          body: formData
        })
          .then(response => {
            if (response.ok) {
              return response.json();
             
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ programmes: response.programmes, loading: false }))
          .catch(error => console.log(error.message));
    }


    render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name}
      </li>
    ));
    
        return (
        <div>
        <Header />
        <div className="fr-container">  
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-lg-12">
              <h1 className="fr-my-6w">Programmes</h1> 
            </div>
          </div> 
          { (this.state.statut=="admin")  ?
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-lg-6">
                {this.state.programmes.map((programme, index) => (
                <div key={index}>
                  <div className="texte_etiquette">{programme.numero}</div>
                </div>
                ))}
              </div>
              <div className="fr-col-lg-6">

                { this.state.loading ? <div className="loader_box"><div className="texte_etiquette text-center">Chargement des données en cours.. Cela peut prendre quelques minutes. </div><div className="d24"></div> <div className ="loader"></div></div> : 
                  <div>
                  <form onSubmit={this.handleSubmit}> 
                     <Dropzone accept='.xlsx' onDrop={this.onDrop}>
                      {({getRootProps, getInputProps}) => (
                        <div className="document-file-input" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div><span className="fr-icon-add-circle-fill" aria-hidden="true"></span></div>
                          <div className="d24"></div>
                          <div className="cgris"> Glissez votre fichier ici</div> 
                          <div className="d12"></div>
                          <div className="tu cgris">Ou téléchargez-le depuis votre appareil</div>
                          <div className="d12"></div>
                          <div className="texte_light cgris">(fichier .xlsx uniquement)</div>
                          <div>{files}</div>
                        </div>
                      )}
                      </Dropzone>
                      <div><button type="submit" className="fr-btn">Envoyer</button></div>
                    </form>
                  </div>
                }
              </div>
            </div>
            :
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-lg-12">
              <p className="fr-mb-6w">Vous n'avez pas accès à cette page.</p> 
            </div>
          </div> 
          }
        </div>
        <Footer />
        </div>
        );
    }
}
export default Programmes;
