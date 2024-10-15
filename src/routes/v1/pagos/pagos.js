import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { pagoCreateValidator, pago_response_list_table } from "./validators/pagos_validator";
import { uploadFile,getCDNUrl } from "../../../utils/s3";
import {DocumentoRepository} from "../documentos/documento_repository";
import { documento, pagos } from "../../../config/schemas";
import { eq } from "drizzle-orm";

const pagos_router = new Hono();


pagos_router.get("evento/:evento_id", async (c) => {

  let {evento_id} = await c.req.param()
  let pagos_result = await c.db.select().from(pagos).fullJoin(documento, eq(pagos.id, documento.pagosId)).where(eq(pagos.eventoId, evento_id))
  
  if(pagos_result.some((item) => item.documento)){

    pagos_result.forEach((item) => {
      if(item.documento){
        let url = getCDNUrl(c.req.validated_user.empresa_nombre+"_"+c.req.validated_user.empresa, item.documento.url);
        item.documento.url = url;
      }
    });
  }
  
  try{
    pagos_result = await pago_response_list_table.parse(pagos_result);
  }catch(e){
    console.log(e);
  }
  return c.html(c.nunjucks.render("pagos/historial_pagos_table.html", {items: pagos_result}))
})


pagos_router.post("/evento/:evento_id", zValidator("form", pagoCreateValidator), async (c) => {
  
  const body = await c.req.parseBody();
  const empresa = c.req.validated_user.empresa_nombre+"_"+c.req.validated_user.empresa;
  let {evento_id} = await c.req.param()
  
  let pago = {
    eventoId: evento_id,
    planId: body.planId,
    amount: body.amount
  }
  
  let create_pago = await c.db.insert(pagos).values(pago).returning();

  if(!create_pago){
    c.status(500);
    return c.html("<p> Error al registrar pago </p>");
  }

  if(!body.documentos){
    c.status(200);
    c.header("HX-Trigger", "reload-payment");
    return c.html("<p> Pago registrado con éxito </p>");
  }
      
  let call_file_s3 = await uploadFile(body.documentos,empresa);

  if(!call_file_s3){
    c.status(500);
    return c.html("<p> Error al subir archivo </p>");
  }

  const documento_instance = new DocumentoRepository();

  let documento = {
    url: call_file_s3,
    pagosId: create_pago[0].id,
    eventoId: evento_id
  }

  let insert_documento = await documento_instance.create(c,documento);

  if(!insert_documento){
    c.status(500);
    return c.html("<p> Error al registrar documento </p>");
  }

  c.status(200);
  c.header("HX-Trigger", "reload-payment");
  return c.html("<p> Pago registrado con éxito </p>");
});

export { pagos_router };
