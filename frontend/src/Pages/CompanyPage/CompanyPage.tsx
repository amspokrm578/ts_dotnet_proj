import React, { useEffect, useState } from 'react'
import { getCompanyProfile } from '../../api';
import { useParams } from 'react-router-dom';
import { CompanyProfile } from '../../Constants/company';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';

interface Props {}

const CompanyPage = (props: Props) => {
    // http://localhost:3000
    let {ticker} = useParams();
    const [company, setCompany] = useState<CompanyProfile>();

    useEffect(() => {
        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker!);
            setCompany(result);
        };
        getProfileInit();
    })
  return (
    <>
    {
        company? (
            <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">

          <Sidebar/>
          <CompanyDashboard/>
         
        </div>
        ) : (
            <div>Company Not found!</div>
        )
    }
    </>
  )
}

export default CompanyPage