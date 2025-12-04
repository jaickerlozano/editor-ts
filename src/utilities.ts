/**Esta función la he creado para poder obtener un tipado string del error ingresado de tipo unknow ya que si lo dejo 
con tipado unknow, me genera error al momento de desplegar el proyecto ya que typescript no lo permite...
 */
export function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}