module.exports = {
  //     getHTMLMailTemplate: (name, PWD) => {
  //         const str = name;
  //         name = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //         name = name.split(' ')[0]
  //         const link = encodeURI(`${process.env.CONTACT_PERSON_COMPANY_DETAILS_ADDITION}?company_temp_id=${supp_ID}&company_name=${compName}`)

  //         return `<!DOCTYPE html>
  // <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  // <head>
  // 	<title></title>
  // 	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  // 	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  // 	<style>
  // 		* {
  // 			box-sizing: border-box;
  // 		}

  // 		body {
  // 			margin: 0;
  // 			padding: 0;
  // 		}

  // 		a[x-apple-data-detectors] {
  // 			color: inherit !important;
  // 			text-decoration: inherit !important;
  // 		}

  // 		#MessageViewBody a {
  // 			color: inherit;
  // 			text-decoration: none;
  // 		}

  // 		p {
  // 			line-height: inherit
  // 		}

  // 		.desktop_hide,
  // 		.desktop_hide table {
  // 			mso-hide: all;
  // 			display: none;
  // 			max-height: 0px;
  // 			overflow: hidden;
  // 		}

  // 		.image_block img+div {
  // 			display: none;
  // 		}

  // 		@media (max-width:500px) {
  // 			.desktop_hide table.icons-inner {
  // 				display: inline-block !important;
  // 			}

  // 			.icons-inner {
  // 				text-align: center;
  // 			}

  // 			.icons-inner td {
  // 				margin: 0 auto;
  // 			}

  // 			.row-content {
  // 				width: 100% !important;
  // 			}

  // 			.stack .column {
  // 				width: 100%;
  // 				display: block;
  // 			}

  // 			.mobile_hide {
  // 				max-width: 0;
  // 				min-height: 0;
  // 				max-height: 0;
  // 				font-size: 0;
  // 				display: none;
  // 				overflow: hidden;
  // 			}

  // 			.desktop_hide,
  // 			.desktop_hide table {
  // 				max-height: none !important;
  // 				display: table !important;
  // 			}
  // 		}
  // 	</style>
  // </head>

  // <body style="text-size-adjust: none; background-color: #fff; margin: 0; padding: 0;">
  // 	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; background-image: none; background-position: 0 0; background-repeat: no-repeat; background-size: auto;">
  // 		<tbody>
  // 			<tr>
  // 				<td>
  // 					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 						<tbody>
  // 							<tr>
  // 								<td>
  // 									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #e5f2ff; border-radius: 0; width: 480.00px; margin: 0 auto;" width="480.00">
  // 										<tbody>
  // 											<tr>
  // 												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
  // 													<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
  // 													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;">
  // 																<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:19.5px;">
  // 																	<p style="margin: 0;">Hi ${name},</p>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 														<tr>
  // 															<td class="pad" style="padding-left:25px;padding-right:10px;padding-top:5px;text-align:center;width:100%;">
  // 																<h1 style="margin: 0; color: #313131; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Welcome to OVTPL!</strong></h1>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:5px;">
  // 																<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
  // 																	<p style="margin: 0;">Buyers are waiting for ${compName} next door.</p>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="divider_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 														<tr>
  // 															<td class="pad">
  // 																<div class="alignment" align="center">
  // 																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="90%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 																		<tr>
  // 																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #000000;"><span>&#8202;</span></td>
  // 																		</tr>
  // 																	</table>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
  // 												</td>
  // 											</tr>
  // 										</tbody>
  // 									</table>
  // 								</td>
  // 							</tr>
  // 						</tbody>
  // 					</table>
  // 					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 						<tbody>
  // 							<tr>
  // 								<td>
  // 									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #e5f2ff; border-radius: 0; width: 480.00px; margin: 0 auto;" width="480.00">
  // 										<tbody>
  // 											<tr>
  // 												<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
  // 													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:5px;padding-left:25px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
  // 																<h1 style="margin: 0; color: #535353; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Your OTP</strong></h1>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 														<tr>
  // 															<td class="pad" style="padding-left:25px;text-align:center;width:100%;">
  // 																<h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: 6px; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${OTP}</span></h1>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  // 														<tr>
  // 															<td class="pad" style="padding-left:25px;padding-top:5px;">
  // 																<div style="color:#7c7c87;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:9px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:10.799999999999999px;">
  // 																	<p style="margin: 0;">*Above OTP is valid for next 24 hours&nbsp;</p>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 												</td>
  // 												<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
  // 													<table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:5px;padding-left:25px;padding-right:25px;padding-top:20px;text-align:left;">
  // 																<div class="alignment" align="left"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:52px;width:130px;v-text-anchor:middle;" arcsize="70%" stroke="false" fillcolor="#4b67fc"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${link}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#4b67fc;border-radius:36px;width:auto;border-top:0px solid #0A0909;font-weight:400;border-right:0px solid #0A0909;border-bottom:0px solid #0A0909;border-left:0px solid #0A0909;padding-top:10px;padding-bottom:10px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:25px;padding-right:25px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Take a look</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-top:5px;">
  // 																<div style="color:#7c7c87;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:9px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:10.799999999999999px;">
  // 																	<p style="margin: 0;">*Use above link to proceed ahead</p>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 												</td>
  // 											</tr>
  // 										</tbody>
  // 									</table>
  // 								</td>
  // 							</tr>
  // 						</tbody>
  // 					</table>
  // 					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  // 						<tbody>
  // 							<tr>
  // 								<td>
  // 									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #4b67fc; width: 480.00px; margin: 0 auto;" width="480.00">
  // 										<tbody>
  // 											<tr>
  // 												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
  // 													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  // 														<tr>
  // 															<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
  // 																<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:9px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:10.799999999999999px;">
  // 																	<p style="margin: 0;">Copyright © 2023 OVTPL, All rights reserved.</p>
  // 																</div>
  // 															</td>
  // 														</tr>
  // 													</table>
  // 												</td>
  // 											</tr>
  // 										</tbody>
  // 									</table>
  // 								</td>
  // 							</tr>
  // 						</tbody>
  // 					</table>

  // 				</td>
  // 			</tr>
  // 		</tbody>
  // 	</table><!-- End -->
  // </body>

  // </html>`
  //     },

  getTEXTMailTemplate: (name, PWD) => {
    const link = encodeURI(`${process.env.OVTPL_LOGIN}`);

    return `

            Hello ${name},

            You received this email because we invited you to use our services.
            Your password is ${PWD},  Please change your password once you sign in.
            ${link}

            If you didn't request this, you can ignore this email.

            Thanks

            User Onboarding Team.
            Other View Technologies (OPC) Pvt. Ltd.`;
  },

  getSubject: () => {
    return `Welcome to OVTPL`;
  },
};
