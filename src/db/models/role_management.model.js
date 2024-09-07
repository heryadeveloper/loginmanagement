module.exports = (sequelize, DataTypes) => {
    const roleManagement = sequelize.define(
        'role_management',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nama_role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },{
        tableName: 'role_management'
    }
    );
    return roleManagement;
}