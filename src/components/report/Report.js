import { useRef ,useState } from "react";
import { useReactToPrint } from "react-to-print";

import SaleTable from "./SaleTable";
import PaymentTable from "./PaymentTable";

function Report({file , data , config}) {
	const [month , setMonth] = useState("");
	
	// console.log(data[0]?.Date , "month");
	const handleFilter =(e)=>{
		if(e.target.value === "--- Select ---"){
			setMonth("");
		}else{
			setMonth(e.target.value);
		}
			
	};
	const filteredData = data?.filter((Month)=>
		Month.Date.toLowerCase().includes(month.toLowerCase()) 
	);
	const myRef=useRef(null);
	const handlePrint  = useReactToPrint ({
		content: ()=>myRef.current
	});
	
	

	return (
		<>
			<a data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
				<i className="bi bi-printer-fill fa-2x" />
			</a>


			<div  className="modal fade" id="staticBackdrop2"  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content" id="Invoice">
						<div className="modal-header">
							<a className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
					

						<div className="modal-body" ref={myRef}>
							<div className="container-fluid">
								<div className="row container">
									<div className="col-7">
										<p className=" text-right lead font-weight-bold marginbottom"><ins><strong>{file}</strong></ins></p>
									</div>
								</div>
								<br />
								<div className="row mt-4">
									<div className="col-2">
										<label htmlFor="Select" className="lead font-weight-bold ">Select Month : </label>
									</div>
									<div className="form-group col-3">
										<select className="form-control" id="Select" onChange={handleFilter}>
											<option>--- Select ---</option>
											<option>Jan</option>
											<option>Feb</option>
											<option>Mar</option>
											<option>Apr</option>
											<option>May</option>
											<option>Jun</option>
											<option>July</option>
											<option>Aug</option>
											<option>Sep</option>
											<option>Oct</option>
											<option>Nov</option>
											<option>Dec</option>
										</select>
									</div>
								</div>
								{file === "PAYMENT-IN" ? <PaymentTable filteredData={filteredData} config={config}/> : <SaleTable filteredData={filteredData} config={config}/>}
							
																
							</div>
						</div>
						<div className="modal-footer">
						
							<button type="button" className="btn btn-primary" id="invoice-print" onClick={handlePrint} ><i className="fa fa-print"></i> Print Report</button>
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i> Close</button>
						</div>
					
					</div>
				</div>
			</div>
		</>
	);
	
}

export default Report;