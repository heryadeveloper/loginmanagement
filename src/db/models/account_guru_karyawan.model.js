module.exports = (sequelize, DataTypes) => {
    const accountGuruKaryawan = sequelize.define(
        'account_guru_karyawan',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag_active:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_role:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        tableName: 'account_guru_karyawan'
    }
    );
    return accountGuruKaryawan;
}