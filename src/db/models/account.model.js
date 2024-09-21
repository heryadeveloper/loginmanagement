module.exports = (sequelize, DataTypes) => {
    const accounts = sequelize.define(
        'account',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        flag_active: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nisn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kelas_saat_ini: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tahun_masuk: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        tableName: 'account'
    }
    );
    return accounts;
}