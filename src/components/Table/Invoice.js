import sign from "./Sign/signature.png";
function Invoice({billInfo}) {

	const Info = billInfo?.map((info) => ({
		invoiceNo: info[1].ID,
		Date: info.timestamp,
		PartyName: info[1].PartyName,
		Address: info[1].Address,
		Phone: info[1].PhoneNo,
		Email: info[1].Email,
		DueDate: info[1].DueDate,
		TotalAmount: info[1].Total,
		Advance: info[1].Advance
	}));

	const allProperties = billInfo?.map((obj) => {
		if (Array.isArray(obj[0])) { 

			return obj[0].map((nestedObj) => {
				return {
					Amount: nestedObj.Amount,
					Item: nestedObj.Item,
					ItemCode: nestedObj.ItemCode,
					MRP: nestedObj.MRP,
					No: nestedObj.No,
					QTY: nestedObj.QTY,
					Unit: nestedObj.Unit
				};
			});
		} else {
			
			return {
				Amount: obj.Amount,
				Item: obj.Item,
				ItemCode: obj.ItemCode,
				MRP: obj.MRP,
				No: obj.No,
				QTY: obj.QTY,
				Unit: obj.Unit
			};
		}
	}).flat();
	let  Details ;
	if(Info){
		// eslint-disable-next-line no-unused-vars
		Details = Info[0] ;
	}
	const advance = parseInt(Details?.Advance );

	return ( <>
		<div className="card-body" >

			<div className="invoice-ribbon"><div className="ribbon-inner">{((Details?.TotalAmount) - (advance)) === 0 ? "PAID" : "UNPAID"}</div></div><div>



				<div className="row">
					<div id="boot-icon" className="col" style={{ fontSize: "30px" }}> Invoice</div>

					<div className="col mr-5 text-right">
						<h4 className="">INVOICE - {Details?.invoiceNo} </h4>
						<span className="">{Details?.Date}</span>
					</div>
				</div>
				<hr />
				<div className="row ">



					<div className="col from ">
						<p className="lead marginbottom font-weight-bold">TO : {Details?.PartyName}</p><br />
						<p>{Details?.Address}</p>

						<p><label className="font-weight-bold">Phone : </label> <span>{Details?.Phone}</span></p>
						<p> <label className="font-weight-bold">Email : </label> <span>{Details?.Email}</span></p>
					</div>



					<div className="col text-right payment-details">
						<p className="lead marginbottom payment-info font-weight-bold">Payment details</p><br />
						<p>
							<label className="font-weight-bold">Due Date : </label>
							<span> {Details?.DueDate}</span>
						</p>
						<p>
							<label className="font-weight-bold">Total Amount : </label>
							<span> {Details?.TotalAmount} </span>
						</p>

					</div>

				</div>
			</div>



			<br />   <div className="row table-row">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th className="text-center" style={{ width: "5%" }}>#</th>
							<th style={{ width: "30%" }}>Item</th>
							<th className="text-right" style={{ width: "20%" }}>Item Code</th>
							<th className="text-right" style={{ width: "15%" }}>MRP</th>
							<th className="text-right" style={{ width: "15%" }}>QTY</th>
							<th className="text-right" style={{ width: "15%" }}>Unit</th>
							<th className="text-right" style={{ width: "15%" }}>Amount</th>
						</tr>
					</thead>
					<tbody>
            
						{allProperties?.map((Row, index) => {
							return (

								<tr key={index}>
									<td className="text-center">{index + 1}</td>

									<td>{Row.Item}</td>
									<td className="text-right">{Row.ItemCode}</td>
									<td className="text-right">{Row.MRP}</td>
									<td className="text-right">{Row.QTY}</td>
									<td className="text-right">{Row.Unit}</td>
									<td className="text-right">{Row.Amount}</td>

								</tr>

							);
						})}
					</tbody>

				</table>

			</div><div className="row">
				<div className="col-xs-6 ml-5 mt-3">
					<p className="lead font-weight-bold marginbottom">THANK YOU! <i className="bi bi-emoji-smile" /></p>
					<img src={sign} alt="Signature" style={{ width : "250px" , height : "100px"}}/>

				</div>
				<div className="col text-right pull-right invoice-total">
					<p>
						<label className="font-weight-bold">Total Amount : </label>
						<span> {Details?.TotalAmount} </span>
					</p>
					<p>
						<label className="font-weight-bold"> Balance : </label>
						<span>{Details?.TotalAmount - advance}</span>
					</p>
					<p>
						<label className="font-weight-bold">Received : </label>
						<span> {advance} </span>
					</p>
				</div>
			</div><div className="col-md-2">

			</div>
		</div>
	</> );
}

export default Invoice;