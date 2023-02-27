import { registerEnumType } from "@nestjs/graphql";

export enum StatusTask{
    pendiente= 'pendiente',
    progreso= 'en-progreso',
    completado= 'completado'
}
registerEnumType(StatusTask,{ name:'StatusTask'})