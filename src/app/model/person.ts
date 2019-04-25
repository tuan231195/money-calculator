export interface IPerson {
  name: string;
  id: number;
}

export function isValid(person: IPerson) {
  return person.name != undefined && person.name !== '';
}
