import React, { useState } from 'react';
import {Form, Button, Row, Col, Spinner, Alert, Container} from 'react-bootstrap';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseType, setResponseType] = useState(null); // 'success' or 'danger'

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Please enter your name!';
        }

        if (!formData.email) {
            newErrors.email = 'Please provide a valid email address!';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Invalid email format!';
        }

        if (!formData.message) {
            newErrors.message = 'Please enter your message!';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        console.log('running')
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setResponseMessage(null);

        try {
            // await axios.post('/contact', formData);
            setResponseMessage('Your message has been sent successfully!');
            setResponseType('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setResponseMessage('There was an error submitting the form. Please try again.');
            setResponseType('danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col sm={12} md={10} lg={8} xxl={7} className="mx-auto">
                    <h2 className="h1" id="contact-us">Get In Touch</h2>
                    <p>I’m always open to discussing new opportunities, collaborating on exciting projects, or just sharing insights on software development. If you have something in mind, feel free to reach out!</p>

                    {responseMessage && (
                        <Alert className="my-4" variant={responseType}>
                            {responseMessage}
                        </Alert>
                    )}

                    <Form className="needs-validation" noValidate onSubmit={handleSubmit} id="contactForm">
                        <Row className="g-4">
                            <Col sm={6}>
                                <Form.Group controlId="name">
                                    <Form.Label className="fs-base">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="email">
                                    <Form.Label className="fs-base">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group controlId="message">
                                    <Form.Label className="fs-base">Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        isInvalid={!!errors.message}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={12} className="pt-2">
                                <Button type="submit" className="btn-lg btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Loading...
                                        </>
                                    ) : (
                                        'Send message'
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactForm;
