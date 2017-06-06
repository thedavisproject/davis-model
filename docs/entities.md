# Entity Types and Properties

## Entity Base

All entities share these properties.

### Properties
* id : _integer_, _required_
    * required for all entities, however can be set to null when creating a new entity and the database will assign an id.
* name : _string_, _required_
* created : _date_, _optional_
    * This should only ever be set by the Repository
* modified: _date_, _optional_
    * This should only ever be set by the Repository

### Methods
* isUnassigned() : _bool_
    * Returns _true_ if the entity doesn't have a valid ID set
* equals(_entity_) : _bool_
    * Compares this entity to that entity
* setCreated(_date_) : _this-entity_
    * Should only ever be called by the repository
* setModified(_date_) : _this-entity_
    * Should only ever be called by the repository

## Hierarchical Entity Base

Incorporates all properties from: *Entity*

All hierarchical entities share these properties.

### Properties
* hierarchical : _bool_, _required (for hierarchical entities)_
    * Is set to _true_ for these entities
* parent : _id_, _optional_


## Folder

Incorporates all properties from: *Hierarchical Entity*

**Entity Type**: folder

### Properties
* No additional properties


## Data Set

Incorporates all properties from: *Entity*

**Entity Type**: dataset

### Properties
* folder : _id_, _optional_
* schema : _obj_, _optional_ (see import docs)


## Variable

Incorporates all properties from: *Entity*

**Entity Type**: variable

### Properties
* type : _enum_ : _required_
    * categorical (1) or quantitative (2)
* key : _string_ : _required_
    * If not specified, defaults to the entity name. Used to match variables to row headers on import. Also used for general cases where a human friendly key is needed.
* scopedDataSet : _id_ : _optional_
    * Variables can be global or local to a specific data set. Set this property to scope a variable to a data set.


## Attribute

Incorporates all properties from: *Hierarchical Entity*

**Entity Type**: attribute

### Properties
* variable : _id_ : _required_
* key : : _string_ : _required_
    * If not specified, defaults to the entity name. Used to match attributes to row values on import. Also used for general cases where a human friendly key is needed.


## User

Incorporates all properties from: *Entity*

**Entity Type**: user

### Properties
* email : _string_, _required_
* admin : _bool_, _required_
    * Defaults to _false_ if not specified
* password: _string_, _required_
    * This should not be set directly. See "setPassword" method

### Methods
* setPassword(_string_) : _this-obj_
    * Salts and hashes the plaintext password argument
* compasePassword(_string_) : _bool_
    * Compares the plainTextPassword with the user's hashed password
