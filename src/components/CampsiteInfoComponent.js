import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

    


function RenderCampsite({campsite}){
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){
    if(comments){
        return(
            <React.Fragment>
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comments => <div key={comments.id}>{comments.text} <br />-{comments.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}<br /><br /></div>)}
                </div>
                <div>
                    <CommentForm />
                </div>
            </React.Fragment>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values){
            this.toggleModal();
            console.log('test');
            alert('other test');
        }

    
    render(){
        return(
            <div>
                
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> {''}Submit Comment
                </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Comment Form</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" classname="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </div>
                                {}
                                <div className="form-group">
                                    <Control.text model=".author" id="author" className="form-control" />
                                    
                                </div>
                                {}
                                <Button type="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </ModalBody>
                    </Modal>
            </div>
        )
    }
}

function CampsiteInfo(props){
    if(props.campsite){
        return(
            <div className="container">
                <div className="row m-1">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;