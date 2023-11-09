import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { Menu } from '../common/menu/Menu';
import { Label, FormGroup, Col, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { InputStyle, LabelStyle, SpanStyle, StyledButton, SuccessButton } from '../../globalstyles/styled';
import { privateAxios } from '../../hooks/axios/axiosHelper'
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';


export const PendingPatient = () => {
    const navigate = useNavigate();

    const { state, actions } = useGlobalContext();
    const [patientData, setPatientData] = useState({})
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showBillClaimedInput, setShowBillClaimedInput] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [dischargeDate, setDischargeDate] = useState(new Date());
    const preStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
    };


    const [patientformData, setPatientFormData] = useState({
        patientStatus: '',
        patientName: '',
        aadharNo: '',
        patientPhone: '',
        diseaseName: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
        billAmount: '',
        billClaimedFrom: '',
        billClaimedAmount: '',
        remarks: '',
        reasonForRejection: '',
        isInformationCorrect: false,
    })
    const resetForm = () => {
        setPatientFormData({
            patientStatus: '',
            patientName: '',
            aadharNo: '',
            patientPhone: '',
            diseaseName: '',
            dateOfAdmission: '',
            dateOfDischarge: '',
            billAmount: '',
            billClaimedFrom: '',
            billClaimedAmount: '',
            remarks: '',
            reasonForRejection: '',
            isInformationCorrect: false,
        });
    };
    useEffect(() => {
        const patientData = JSON.parse(localStorage.getItem('patientData'));
        console.log('Patient Data in PendingPatient:', patientData);
        setPatientData(patientData);
      }, [state.patientData]);

    const handleRadioChange = (event) => {
        setSelectedStatus(event.target.value);
        resetForm();
        setPatientFormData(prevData => ({
            ...prevData,
            patientStatus: event.target.value,
        }))
    }
    const handleCheckboxChange = () => {
        setPatientFormData(prevData => ({
            ...prevData,
            isInformationCorrect: !prevData.isInformationCorrect,
        }));
    };
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setPatientFormData(prevData => ({
            ...prevData,
            billClaimedFrom: event.target.value,
        }))
        setShowBillClaimedInput(event.target.value !== '0' && event.target.value !== '4');
    };
    const handleDatePickerChange = (date, field) => {
        const formattedDate = format(date, "dd/MM/yyyy");

        if (field === 'dateOfAdmission') {
            setAdmissionDate(date);
        }
        else if (field === 'dateOfDischarge') {
            setDischargeDate(date);
        }
        setPatientFormData(prevData => ({
            ...prevData,
            [field]: formattedDate,
        }));}
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`;
      };
    const intOnly = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    };
    const numOnly = (event) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    }
    const handleChange = (event, field) => {
        let value = event.target.value;
        setPatientFormData({
            ...patientformData,
            [field]: event.target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(patientformData.patientStatus)
        if (patientformData.patientStatus === 'accept') {
            if (patientformData.patientName == '') {
                toast.error('Patient Name is required')
                return
            }
            if (patientformData.aadharNo == '') {
                toast.error('Aadhar Number is required')
                return
            }
            if (patientformData.aadharNo.length < 12) {
                toast.error('Aadhar should be 12 digits')
                return
            }
            if (patientformData.patientPhone == '') {
                toast.error('Phone Number is required')
                return
            }
            if (patientformData.patientPhone.length < 10) {
                toast.error('Phone Number should be 10 digits')
                return
            }
            if (patientformData.diseaseName == '') {
                toast.error('Disease Name is required')
                return
            }
            if (patientformData.dateOfAdmission == '') {
                toast.error('Date of Admission is required')
                return
            }
            if (patientformData.dateOfDischarge == '') {
                toast.error('Date of Discharge is required')
                return
            }
            console.log(patientformData.dateOfDischarge,patientformData.dateOfAdmission)
            const admissionDate = new Date(formatDate(patientformData.dateOfAdmission));
            const dischargeDate = new Date(formatDate(patientformData.dateOfDischarge));
            console.log(admissionDate, dischargeDate)

            if (dischargeDate <= admissionDate) {
                toast.error('Discharge date should be greater than admission date');
                return;
            }
            if (patientformData.billAmount == '') {
                toast.error('Bill Amount is required')
                return
            }
            if (patientformData.billClaimedFrom == '') {
                toast.error('Bill Claimed From is required')
                return
            }
            if (patientformData.billClaimedAmount == '' && patientformData.billClaimedFrom !== '4' && patientformData.billClaimedFrom !== '0') {
                toast.error('Bill Claimed Amount is required')
                return
            }
            if (patientformData.remarks == '') {
                toast.error('Remarks are required')
                return
            }
            console.log(!patientformData.isInformationCorrect)
            if (!patientformData.isInformationCorrect) {
                toast.error("Read declaration and select the check box")
                return
            }

        }
        else if (patientformData.patientStatus == 'reject') {
            console.log(patientformData)
            if (patientformData.reasonForRejection == '') {
                toast.error('Reason for rejection is required')
                return
            }
            console.log(patientformData.isInformationCorrect)
            if (!patientformData.isInformationCorrect) {
                toast.error("Read declaration and select the check box")
                return
            }
        }
        const response = privateAxios.put('/auth/UpdatePatientStatus', { ...patientData, ...patientformData }).then((response) => {
            console.log(response)
            console.log(response.data.statusCode)
            if (response.status === 200) {
                if (response.data.statusCode === 200) {
                    toast.success("Patient Status updated successfully")
                    resetForm()
                    navigate('/patient-report')
                    console.log(patientformData.billClaimedFrom)
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                toast.error(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <Menu />
            <div className='container'>
                <div className='p-3 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
                    <LabelStyle className='text-center'>Patient Details</LabelStyle>
                    <div className='px-4 pt-3'>
                        <pre style={preStyle}><b>Patient IP: </b>{patientData.patientIp}</pre>
                        <pre style={preStyle}><b>Admission No: </b>{patientData.admissionNo}</pre>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="patientStatus" value="accept"
                                onChange={handleRadioChange}
                                checked={selectedStatus === 'accept'} />
                            <label className="form-check-label"><b style={{color:'green'}}>ACCEPT</b></label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="patientStatus" value="reject" onChange={handleRadioChange}
                                checked={selectedStatus === 'reject'} />
                            <label className="form-check-label"><b style={{color:'red'}}>REJECT</b></label>
                        </div>
                        {selectedStatus === 'accept' && (
                            <form onSubmit={submitHandler}>
                                <div className='my-3' style={{ color: 'red' }}>
                                    <h6>Note 1 : Please do not use special characters <br />
                                        (@ ` ~ ! # $ % ^ & * ( ) - _ = + | { } [ ] ; : ' " , . / ? \)</h6>
                                    <h6>Note 2 : (*) shows mandatory Fields.</h6>
                                </div>
                                <FormGroup row className='my-3'>
                                    <Label lg={4}>Patient Name:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}><InputStyle type='text' value={patientformData.patientName} name='patientName' onChange={e => handleChange(e, 'patientName')} /></Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}>Aadhar No:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}><InputStyle type='text' maxLength={12}
                                        value={patientformData.aadharNo} name='aadharNo' onChange={e => handleChange(e, 'aadharNo')} onKeyUp={intOnly}/></Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}>Patient Phone No:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}><InputStyle type='text' maxLength={10} name='patientPhone' value={patientformData.patientPhone} onChange={e => handleChange(e, 'patientPhone')} onKeyUp={intOnly} /></Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}>Name Of Disease:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}><InputStyle type='text' name='diseaseName' value={patientformData.diseaseName} onChange={e => handleChange(e, 'diseaseName')} /></Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}> Date Of Admission (dd/mm/yy):<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}>
                                        <DatePicker
                                            name='dateOfAdmission'
                                            selected={admissionDate}
                                            dateFormat='dd/MM/yyyy'
                                            onChange={(date) => handleDatePickerChange(date, 'dateOfAdmission')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}> Date Of Discharge (dd/mm/yy):<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}>
                                        <DatePicker
                                            name='dateOfDischarge'
                                            selected={dischargeDate}
                                            dateFormat='dd/MM/yyyy'
                                            onChange={(date) => handleDatePickerChange(date, 'dateOfDischarge')}
                                        /> </Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}> Bill Amount(Rs):<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}><InputStyle type='text' name='billAmount' value={patientformData.billAmount} onChange={e => handleChange(e, 'billAmount')} maxLength={7} onKeyUp={numOnly}/></Col>
                                </FormGroup>
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}>Bill Claimed From:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}>
                                        <Input id="exampleSelect" name="select" type="select" onChange={handleSelectChange}>
                                            <option value='0'>Select</option>
                                            <option value='1'>Insurance Claimed</option>
                                            <option value='2'>LOC</option>
                                            <option value='3'>PMRF</option>
                                            <option value='4'>None</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {showBillClaimedInput && (
                                    <FormGroup row className='mt-2'>
                                        <Label lg={4}>Bill Claimed Amount(Rs):<SpanStyle>*</SpanStyle></Label>
                                        <Col lg={8}><InputStyle name='billClaimedAmount' type='text' value={patientformData.billClaimedAmount} onChange={e => handleChange(e, 'billClaimedAmount')} maxLength={6} onKeyUp={numOnly} /></Col>
                                    </FormGroup>
                                )}
                                <FormGroup row className='mt-2'>
                                    <Label lg={4}>Remarks:<SpanStyle>*</SpanStyle></Label>
                                    <Col lg={8}> <InputStyle type='text' name='remarks' value={patientformData.remarks} onChange={e => handleChange(e, 'remarks')} />  </Col>
                                </FormGroup>
                                <div className="form-check mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="defaultCheck1"
                                        checked={patientformData.isInformationCorrect}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        <b>I submit the above information as per our record is correct.</b>
                                    </label>
                                </div>
                                <div className='text-center mt-3'>
                                    <SuccessButton type='submit'>Submit</SuccessButton>
                                    <StyledButton type='button' onClick={() => window.history.back()}>Back</StyledButton>
                                </div>
                            </form>
                        )}

                        {selectedStatus === 'reject' && (
                            <form onSubmit={submitHandler}>
                                <div className="form-group mt-3">
                                    <label className='mb-2'>Reason for Rejection:<SpanStyle>*</SpanStyle></label>
                                    <textarea className="form-control" name='reasonForRejection' id="exampleFormControlTextarea1" rows="3" value={patientformData.reasonForRejection} onChange={e => handleChange(e, 'reasonForRejection')}></textarea>
                                </div>
                                <div className="form-check mt-3">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={patientData.isInformationCorrect}
                                        onChange={handleCheckboxChange} />
                                    <label className="form-check-label">
                                        <b>I submit the above information as per our record is correct.</b>
                                    </label>
                                </div>
                                <div className='text-center mt-3'>
                                    <SuccessButton type='submit'>Submit</SuccessButton>
                                    <StyledButton type='button' onClick={() => window.history.back()}>Back</StyledButton>
                                </div>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )

}
