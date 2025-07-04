import { AttachmentPointName } from 'domain/types';
import type { FlipDirection } from 'application/editor/shared/utils.types';

export enum KetNodeType {
  MONOMER = 'monomer',
  AMBIGUOUS_MONOMER = 'ambiguousMonomer',
}

export type MonomerTransformation = Partial<{
  rotate: number;
  shift: Partial<{
    x: number;
    y: number;
  }>;
  flip: FlipDirection;
}>;

export type AmbiguousMonomerTransformation = Pick<
  MonomerTransformation,
  'flip'
>;

export interface IKetMonomerNode {
  type: KetNodeType.MONOMER;
  id: string;
  seqid?: number;
  position: {
    x: number;
    y: number;
  };
  alias: string;
  templateId: string;
  expanded?: boolean;
  transformation?: MonomerTransformation;
  selected?: boolean;
}

export interface IKetAmbiguousMonomerNode {
  type: KetNodeType.AMBIGUOUS_MONOMER;
  id: string;
  position: {
    x: number;
    y: number;
  };
  alias: string;
  templateId: string;
  transformation?: AmbiguousMonomerTransformation;
  selected?: boolean;
}

export type KetNode = IKetMonomerNode | IKetAmbiguousMonomerNode;

export interface IKetConnectionMonomerEndPoint {
  monomerId: string;
  attachmentPointId?: string;
  groupId?: string;
}

export interface IKetConnectionMoleculeEndPoint {
  moleculeId: string;
  atomId: string;
}

export type IKetConnectionEndPoint = IKetConnectionMonomerEndPoint &
  IKetConnectionMoleculeEndPoint;

export enum KetConnectionType {
  SINGLE = 'single',
  HYDROGEN = 'hydrogen',
}

export interface IKetTemplateConnectionEndPoint {
  monomerTemplateId: string;
  attachmentPointId: AttachmentPointName;
}

export interface IKetTemplateConnection {
  connectionType: KetConnectionType;
  endpoint1: IKetTemplateConnectionEndPoint;
  endpoint2: IKetTemplateConnectionEndPoint;
}

export interface IKetConnection {
  connectionType: KetConnectionType;
  label?: string;
  endpoint1: IKetConnectionEndPoint;
  endpoint2: IKetConnectionEndPoint;
  selected?: boolean;
}

export type monomerClass =
  | 'RNA'
  | 'PEPTIDE'
  | 'CHEM'
  | 'UNKNOWN'
  | 'DNA'
  | 'MODDNA';

export enum KetMonomerClass {
  AminoAcid = 'AminoAcid',
  Sugar = 'Sugar',
  Phosphate = 'Phosphate',
  Base = 'Base',
  Terminator = 'Terminator',
  Linker = 'Linker',
  Unknown = 'Unknown',
  CHEM = 'CHEM',
  RNA = 'RNA',
  DNA = 'DNA',
}
export type IKetAttachmentPointType = 'left' | 'right' | 'side';

export interface IKetAttachmentPoint {
  attachmentAtom: number;
  leavingGroup: {
    atoms: number[];
  };
  type?: IKetAttachmentPointType;
  label?: string;
}

export interface IKetIdtAliases {
  base: string;
  modifications?: {
    internal?: string;
    endpoint3?: string;
    endpoint5?: string;
  };
}

export enum KetTemplateType {
  MONOMER_TEMPLATE = 'monomerTemplate',
  MONOMER_GROUP_TEMPLATE = 'monomerGroupTemplate',
  AMBIGUOUS_MONOMER_TEMPLATE = 'ambiguousMonomerTemplate',
}

export enum KetAmbiguousMonomerTemplateSubType {
  ALTERNATIVES = 'alternatives',
  MIXTURE = 'mixture',
}

export interface KetAmbiguousMonomerTemplateOption {
  templateId: string;
  ratio?: number;
  probability?: number;
}

export interface IKetMonomerTemplate {
  type: KetTemplateType.MONOMER_TEMPLATE;
  class?: KetMonomerClass;
  monomerSubClass?:
    | 'AminoAcid'
    | 'Sugar'
    | 'Phosphate'
    | 'Base'
    | 'Terminator'
    | 'Linker'
    | 'Unknown'
    | 'CHEM';
  naturalAnalogShort: string;
  id: string;
  fullName?: string;
  alias: string;
  naturalAnalog?: string;
  attachmentPoints?: IKetAttachmentPoint[];
  root: {
    nodes;
  };
  classHELM?: string;
  name?: string;
  idtAliases?: IKetIdtAliases;
  unresolved?: boolean;
  atoms: [];
  bonds: [];
  modificationType?: string;
}

export interface IKetAmbiguousMonomerTemplate {
  type: KetTemplateType.AMBIGUOUS_MONOMER_TEMPLATE;
  id: string;
  subtype: KetAmbiguousMonomerTemplateSubType;
  options: KetAmbiguousMonomerTemplateOption[];
  idtAliases?: IKetIdtAliases;
  alias?: string;
}

export interface IKetMonomerTemplateRef {
  $ref: string;
}

export enum KetMonomerGroupTemplateClass {
  RNA = 'RNA',
}

export interface IKetMonomerGroupTemplate {
  id: string;
  name: string;
  type: KetTemplateType;
  class?: KetMonomerGroupTemplateClass;
  templates: IKetMonomerTemplateRef[];
  connections: IKetTemplateConnection[];
  idtAliases?: IKetIdtAliases;
}

export interface IKetNodeRef {
  $ref: string;
}

export interface IKetMacromoleculesContentRootProperty {
  root: {
    nodes: IKetNodeRef[];
    connections: IKetConnection[];
    templates: IKetMonomerTemplateRef[];
  };
}

export interface IKetMacromoleculesContentOtherProperties {
  [key: string]:
    | KetNode
    | IKetMonomerTemplate
    | IKetMonomerGroupTemplate
    | IKetAmbiguousMonomerTemplate;
}

export type IKetMacromoleculesContent = IKetMacromoleculesContentRootProperty &
  IKetMacromoleculesContentOtherProperties;
